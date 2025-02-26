'use client';

import { toast } from '@/hooks/use-toast';
import config from '@/lib/config';
import { cn } from '@/lib/utils';
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const ONE_MB = 1024 * 1024;
export const TWENTY_MB = 20 * ONE_MB;
export const FIFTY_MB = 50 * ONE_MB;

interface Props {
	type: 'image' | 'video';
	accept: string;
	placeholder: string;
	folder: string;
	variant: 'dark' | 'light';
	onFileChange: (filePath: string) => void;
	value?: string;
}

const authenticator = async () => {
	try {
		const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Request failed with status ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		const { signature, expire, token } = data;

		return { token, expire, signature };
	} catch (error: any) {
		throw new Error(`Authentication failed: ${error.message}`);
	}
};

const {
	env: {
		imagekit: { publicKey, urlEndpoint },
	},
} = config;

const FileUpload = ({ type, accept, placeholder, folder, variant, onFileChange, value }: Props) => {
	const ikUploadRef = useRef(null);
	const [file, setFile] = useState<{ filePath: string } | null>();
	const [progress, setProgress] = useState(0);

	const styles = {
		button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
		placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
		text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
	};

	const onError = (error: any) => {
		console.error(error);
		toast({
			title: `${type} uploaded failed.`,
			description: `Your ${type} could not be uploaded! Please try again.`,
			variant: 'destructive',
		});
	};

	const onSuccess = (res: any) => {
		setFile(res);
		onFileChange(res.filePath);

		toast({
			title: `${type} uploaded successfully.`,
			description: `${res.filePath} uploaded!`,
		});
	};

	const onValidate = (file: File) => {
		if (type === 'image') {
			if (file.size > TWENTY_MB) {
				toast({
					title: 'File size too large.',
					description: 'Please upload a file smaller than 20MB.',
					variant: 'destructive',
				});

				return false;
			}
		} else if (type === 'video') {
			if (file.size > FIFTY_MB) {
				toast({
					title: 'File size too large.',
					description: 'Please upload a file smaller than 50MB.',
					variant: 'destructive',
				});

				return false;
			}
		}

		return true;
	};

	return (
		<ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
			<IKUpload
				className="hidden"
				ref={ikUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				useUniqueFileName={true}
				validateFile={onValidate}
				onUploadStart={() => setProgress(0)}
				onUploadProgress={({ loaded, total }) => {
					const percent = Math.round((loaded / total) * 100);
					setProgress(percent);
				}}
				folder={folder}
				accept={accept}
			/>

			<button
				className={cn('upload-btn', styles.button)}
				onClick={(e) => {
					e.preventDefault();
					if (ikUploadRef.current) {
						// @ts-ignore
						ikUploadRef.current?.click();
					}
				}}
			>
				<Image src="/icons/upload.svg" alt="uplaod icon" width={20} height={20} className="object-contain" />
				<p className={cn('text-base', styles.placeholder)}>{!file && placeholder}</p>

				{file && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>}
			</button>

			{progress > 0 && progress !== 100 && (
				<div className="w-full rounded-full bg-green-200">
					<div className="progress" style={{ width: `${progress}%` }}>
						{progress}%
					</div>
				</div>
			)}

			{file &&
				(type === 'image' ? (
					<IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />
				) : type === 'video' ? (
					<IKVideo path={file.filePath} controls={true} className="h-96 w-full rounded-xl" />
				) : null)}
		</ImageKitProvider>
	);
};

export default FileUpload;

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { bookSchema } from '@/lib/validations';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Props extends Partial<Book> {
	type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: Props) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof bookSchema>>({
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: '',
			author: '',
			genre: '',
			rating: 1,
			totalCopies: 0,
			description: '',
			coverUrl: '',
			coverColor: '',
			videoUrl: '',
			summary: '',
		},
	});

	const onSubmit = async (value: z.infer<typeof bookSchema>) => {
		console.log('Submit!');
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* TITLE */}
				<FormField
					control={form.control}
					name={'title'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>
							<FormControl>
								<Input required placeholder="Enter the Book Title" {...field} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* AUTHOR */}
				<FormField
					control={form.control}
					name={'author'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Author</FormLabel>
							<FormControl>
								<Input required placeholder="Enter the Author Name" {...field} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* GENRE */}
				<FormField
					control={form.control}
					name={'genre'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Genre</FormLabel>
							<FormControl>
								<Input required placeholder="Enter the Book Genre" {...field} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* RATING */}
				<FormField
					control={form.control}
					name={'rating'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Rating</FormLabel>
							<FormControl>
								<Input type="number" min={1} max={5} required {...field} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* TOTAL COPIES */}
				<FormField
					control={form.control}
					name={'totalCopies'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Total Copies</FormLabel>
							<FormControl>
								<Input type="number" min={1} max={10000} required {...field} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* BOOK IMAGE */}
				<FormField
					control={form.control}
					name={'coverUrl'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Image</FormLabel>
							<FormControl>{/* FILE UPLOAD */}</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* BOOK COLOR */}
				<FormField
					control={form.control}
					name={'coverColor'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Color</FormLabel>
							<FormControl>{/* COLOR PICKER */}</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* DESC */}
				<FormField
					control={form.control}
					name={'description'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter the Book Description" {...field} rows={5} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* VIDEO */}
				<FormField
					control={form.control}
					name={'videoUrl'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Trailer</FormLabel>
							<FormControl>{/* FILE UPLOAD */}</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* SUMMARY */}
				<FormField
					control={form.control}
					name={'summary'}
					render={({ field }) => (
						<FormItem className="flex flex-col gap-1">
							<FormLabel className="text-base font-normal text-dark-500">Book Summary</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter the Book Summary" {...field} rows={10} className="book-form_input" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="book-form_btn text-white" type="submit">
					Add Book to Library
				</Button>
			</form>
		</Form>
	);
};

export default BookForm;

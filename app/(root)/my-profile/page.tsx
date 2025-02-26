import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { sampleBooks } from '@/constants';

const MyProfilePage = () => {
	return (
		<>
			<BookList title="Borrowed Books" books={sampleBooks} />
		</>
	);
};

export default MyProfilePage;

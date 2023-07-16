import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { useDeleteBookMutation, useGetBooksQuery, useSingleBookQuery } from '@/redux/features/books/bookApi';
import { setId } from '@/redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

export default function BookDetails() {
  const { id } = useParams();

  const { data: book, isLoading, error , refetch  } = useSingleBookQuery(id);
  const { id:stateID } = useAppSelector((state) => state.book);

  const navigate = useNavigate();

  const [deleteBookMutation] = useDeleteBookMutation(); // Destructuring the mutate function from the hook

  const handleDelete = useCallback(() => {
    deleteBookMutation(id)
      .unwrap()
      .then(() => {
        toast({
          description: 'Book Deleted Successfully',
        });
        navigate('/books');
       
      })
      .catch((error: any) => {
        console.error('Error deleting book:', error);
        // Handle error if the deletion fails
      });
  }, [deleteBookMutation, id]);

  const dispatch = useAppDispatch()

  const handleClick= (id: string | undefined) =>{
    dispatch(setId(id!));
  }     

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Published In: {book?.publicationDate}</p>
          <Button onClick={() => handleClick(id)}><Link to={`/update-book/${id}`}>Edit Book</Link></Button>
          <Popover>
        <PopoverTrigger><Button onClick={() => handleClick(id)}>Delete Book</Button></PopoverTrigger>
        <PopoverContent>
          <p>Are you sure you want to delete this book?</p>
          <Button onClick={() => handleDelete(stateID)}>Confirm</Button>
        </PopoverContent>
      </Popover>
      {/* <Button onClick={() => handleDelete(id)}>Delete Book</Button> */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-b border-gray-300">
        <h1 className="text-2xl uppercase mb-5">Reviews</h1>
        <BookReview id={id!} />
      </div>
      
    </>
  );
}

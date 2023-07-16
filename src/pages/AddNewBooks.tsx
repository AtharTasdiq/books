import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast';
import { useAddBooksMutation } from '@/redux/features/books/bookApi';
import { useForm } from 'react-hook-form';

interface AddNewBookInputs {
    title: string;
    genre: string;
    author: string;
    image: string;
    publicationDate: number;
  }

export default function AddNewBooks() {

    

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<AddNewBookInputs>();

      const [postBook, { isLoading, isError, isSuccess }] = useAddBooksMutation();

      const onSubmit = async (data: AddNewBookInputs) => {
        const options = {
            data: data,
          };
        postBook(options);
        toast({
            description: 'New Book Added',
          });
        reset();
      };

  return (
    <div className=" h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
        <h1 className="mb-5 mt-5 text-6xl">Add New Books</h1>
        <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" className="mt-2" {...register('title', { required: 'Title is required' })}/>
                {errors.title && <p>{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input type="text" id="genre" className="mt-2" {...register('genre', { required: 'Genre is required' })} />
                {errors.genre && <p>{errors.genre.message}</p>}
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input type="text" id="author" className="mt-2" {...register('author', { required: 'Author is required' })} />
                {errors.author && <p>{errors.author.message}</p>}
              </div>
              <div>
                <Label htmlFor="publicationDate">Publication Year</Label>
                <Input type="number" id="publicationDate" className="mt-2" {...register('publicationDate', { required: 'Publication Year is required' })} />
                {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="image">Image Address</Label>
            <Input id="image" className="mt-2" {...register('image', { required: 'Image Address is required' })} />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <Button className='w-full mt-5'>Add New Book</Button>
        </div>
      </div>
        </form>
        </div>
      </div>
  )
}

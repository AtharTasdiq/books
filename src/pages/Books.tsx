import BookCard from '@/components/BookCard';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import {
  setDateRange,
  setGenre,
} from '@/redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { Input } from '@/components/ui/input';
import { HiOutlineSearch } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { setInputValue } from '@/redux/features/books/searchSlice';
import { ChangeEvent } from 'react';

export default function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  
  const handleChange = (data: string) => {
    dispatch(setGenre(data));
  };

  const { toast } = useToast();

  const { dateRange, status, genre } = useAppSelector((state) => state.book);
  const { inputValue } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  //console.log(genre)
  const handleSlider = (value: number[]) => {
    dispatch(setDateRange(value[0]));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };
  let booksData;
  //console.log(booksData)
  if (inputValue) {
    const regex = new RegExp(inputValue, 'i');
    booksData = data?.data?.filter(
      (item: { title: string; genre: string; author: string }) =>
        regex.test(item.title) || regex.test(item.genre) || regex.test(item.author)
    );
  }
  else if (status) {
    booksData = data?.data?.filter(
      (item: { status: boolean;genre:string; publicationDate: number }) =>
        item.status === true && item.publicationDate <= dateRange
    );
  }else if(genre){
    booksData = data?.data?.filter(
      (item:{genre:string})=>item.genre === genre
    );
  } else if (dateRange > 0) {
    booksData = data?.data?.filter(
      (item: { publicationDate: number }) => item.publicationDate <= dateRange
    );
  }
   else {
    booksData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase mb-5">Filter Books</h1>
          {/* <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div> */}
          <Select
          onValueChange={(value) =>handleChange(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="">All</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="action">Action</SelectItem>
            <SelectItem value="romantic">Romantic</SelectItem>
          </SelectContent>
        </Select>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-xl uppercase">Publication Year</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[2023]}
              max={2023}
              min={1900}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 1900 To {dateRange}</div>
        </div>
        <div className='mt-5 pt-5'>
        <h1 className="text-2xl uppercase mb-5">Search Books</h1>
          <form className="flex items-center" 
          //onSubmit={handleSubmit}
          >
            <Input
              className=""
              onChange={(e)=>handleSearch(e)}
              // value={inputValue}
            />
            <Button 
            //type="submit" 
            disabled
            variant="ghost">
              <HiOutlineSearch size="25" />
            </Button>
          </form>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}

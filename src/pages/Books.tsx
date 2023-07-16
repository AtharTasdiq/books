import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useGetBooksQuery, useSearchBookQuery } from '@/redux/features/books/bookApi';
import {
  setDateRange,
  toggleState,
  setGenre,
} from '@/redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  //const [inputValue, setInputValue] = useState<string>('');
  
  //console.log(searchData)
  const handleChange = (data: string) => {
    dispatch(setGenre(data));
    //setInputValue(data)
  };

  const { toast } = useToast();

  const { dateRange, status, genre } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  //console.log(genre)
  // const searchData = useSearchBookQuery(genre);
  // console.log(searchData)
  const handleSlider = (value: number[]) => {
    dispatch(setDateRange(value[0]));
  };

  let booksData;
  //console.log(booksData)

  if (status) {
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
          <h1 className="text-2xl uppercase">Filter</h1>
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
          <h1 className="text-2xl uppercase">Publication Year</h1>
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
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}

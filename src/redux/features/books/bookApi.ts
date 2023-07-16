import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    addBooks: builder.mutation({
      query: ({data}) => ({
        url: '/book',
        method: 'POST',
        body: data,}) 
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    searchBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetReviewQuery,
  useGetBooksQuery,
  usePostReviewMutation,
  useSingleBookQuery,
  useSearchBookQuery,
  useAddBooksMutation,
} = bookApi;

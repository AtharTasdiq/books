import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails';
import PrivateRoute from './PrivateRoute';
import AddNewBooks from '@/pages/AddNewBooks';
import UpdateBook from '@/pages/UpdateBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />,
          </PrivateRoute>
        ),
      },
      {
        path: '/add-new-book',
        element: (
          <PrivateRoute>
            <AddNewBooks />,
          </PrivateRoute>
        ),
      },
      {
        path: '/update-book/:id',
        element: (
          <PrivateRoute>
            <UpdateBook />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;

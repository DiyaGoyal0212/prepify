import {createBrowserRouter} from 'react-router-dom';
import App from "../App";
import Home from '../pages/homepage/Home';
import Login from '../pages/homepage/Login';
import Signup from '../pages/homepage/Signup';
import Resume from '../pages/Resume';
import CppQuestions from '../pages/CppQuestions';
import JavaQuestions from '../pages/JavaQuestions';
import ReactQuestions from '../pages/ReactQuestions';
import Calendar from '../pages/Calendar';
import Record from '../pages/Record';
import Test from '../pages/Test';
import TestPage from '../pages/TestPage';
import Certificate from '../pages/Certificate';
import Thankyou from '../pages/Thankyou';
import InterviewOptions from '../pages/homepage/InterviewOptions';
import TextInterview from '../pages/homepage/TextInterview';


const router = createBrowserRouter([
    {
        path : "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            },
            {
                path: "/resume",
                element: <Resume/>
            },
            {
                path: "/cpp",
                element: <CppQuestions/>
            },
            {
                path: "/java",
                element: <JavaQuestions/>
            },
            {
                path: "/react",
                element: <ReactQuestions/>
            },
            {
                path: "/interview",
                element: <Calendar/>
            },
            {
                path: "/record",
                element: <Record/>
            },
            {
                path:"/Test" ,
                element:<Test />
            },{
                path:"/TesT/:testId" ,
                element:<TestPage />

            },{
                path:"/certificate" ,element:<Certificate />

            },{
                path:"/Thankyou", element:<Thankyou />
            },{
                path:"options", element:<InterviewOptions />
            },
            {
                path:"text-base",
                element:<TextInterview/>
            },
        ]
    }
])

export default router;
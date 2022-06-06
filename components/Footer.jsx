/* eslint-disable react/jsx-no-target-blank */
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiOutlineGlobal,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className='fixed flex items-center justify-center w-full h-20 backdrop-blur-lg left-0 bottom-0 z-30 shadow-inner'>
      <div className='flex gap-8'>
        <a
          className='hover:bg-black hover:text-slate-100 rounded-full transition-all duration-500'
          href='https://github.com/bimbaquingoch'
          target='_blank'>
          <AiFillGithub size={45} />
        </a>
        <a
          className='bg-slate-100 rounded-full text-sky-400 hover:bg-sky-400 hover:text-slate-100 transition-all duration-500'
          href='https://twitter.com/bryandresimba'
          target='_blank'>
          <AiFillTwitterCircle size={45} />
        </a>
        <a
          className='rounded-full bg-slate-200 hover:bg-slate-700 hover:text-slate-100 transition-all duration-500'
          href='https://bimbaquingo.netlify.app/'
          target={"_blank"}>
          <AiOutlineGlobal size={45} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

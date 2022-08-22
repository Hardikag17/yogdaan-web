import Forum from './forum';

export default function Body() {
  return (
    <div className=' flex flex-row h-full '>
      <div className=' w-1/3 m-auto flex flex-col justify-center'>
        <div className=' font-extrabold text-7xl py-2 text-center mb-44'>
          Yogdaan
        </div>
        <div>
          <h1 className=' text-center font-semibold'>
            Choose your profile type
          </h1>
          <div className='flex flex-row justify-center items-center '>
            <button className='bg-blue m-2 hover:scale-105 cursor-pointer hover:brightness-125 rounded-xl lg:px-10 lg:py-2 text-white text-body text-center'>
              SHG
            </button>
            <button className='bg-blue m-2 hover:scale-105 cursor-pointer hover:brightness-125 rounded-xl lg:px-10 lg:py-2 text-white text-body text-center'>
              Bank
            </button>
          </div>
        </div>
      </div>
      <div className=' w-2/3 flex flex-col justify-center items-center '>
        <h1 className=' text-3xl font-extrabold py-2'>Discussion forum</h1>
        <div className=' h-[500px] my-2 overflow-y-scroll snap snap-y snap-mandatory flex flex-row flex-wrap hide-scroll-bar justify-center'>
          <Forum />
          <Forum />
          <Forum />
          <Forum />
        </div>
      </div>
    </div>
  );
}

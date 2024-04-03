export default function PostSkeleton() {
  return (
    <>
    <div
      className='transition-all duration-300 hover:ring-2 hover:ring-base-200 relative w-full rounded-m border-base-200 bg-white pb-l pl-xl pr-xl pt-l text-base-600 animate-pulse'
      data-testid='single-post'
    >
      <div>
        <div>
          <div className='absolute -ml-[82px] -mt-xs'>
            <figure className='transition-border-radius cursor-pointer overflow-hidden rounded-full bg-primary-200 duration-100 ease-out border-6 border-base-100 w-16 h-16 '>
              <div className='h-full w-full object-cover transition-all duration-300 ease-in-out hover:scale-105'>
                <div className='h-full w-full bg-gray-200 rounded-s'></div>
              </div>
            </figure>
          </div>
          <div className='mb-xs mb-font-label-l bg-gray-200 h-4 rounded-s w-1/3'></div>
          <div className='flex'>
            <div>
              <div className='h-4 bg-gray-200 rounded-s w-1/4'></div>
            </div>
            <div className='ml-s'>
              <div className='h-4 bg-gray-200 rounded-s w-1/4'></div>
            </div>
          </div>
          <div className='mt-s text-black bg-gray-200 h-4 rounded w-1/2'></div>
          <div className='group relative h-auto w-full cursor-pointer overflow-hidden rounded-s'>
            <div className='h-32 bg-gray-200 rounded-s mt-2'></div>
          </div>
          <div className='grid place-content-center'></div>
          <div className='pt-s'></div>
          <div className='flex -ml-s pl-xxs lg:gap-xl md:gap-l gap-xs'>
            <div className='bg-gray-200 rounded-s h-6 w-1/2'></div>
            <div className='bg-gray-200 rounded-s h-6 w-1/2'></div>
          </div>
        </div>
      </div>
    </div>
  <div className="pt-l"></div>
  </>
  );
}

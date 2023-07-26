const Loading = ({ className = '' }: {className : string}) => {
  return (
      <div
          className={`border-t-[#077433] border-[#d9d9d9] border-[4px] rounded-[50%] w-[32px] h-[32px] animate-spin-circle-1 ${className}`}
      ></div>
  );
};

export default Loading;

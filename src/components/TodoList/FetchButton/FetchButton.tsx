interface PropsTypes {
  title: string;
  onCLick: () => void;
  isLoading: boolean;
}

const FetchButton = ({ title, onCLick, isLoading }: PropsTypes) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <button onClick={onCLick}>{title}</button>;
};

export default FetchButton;

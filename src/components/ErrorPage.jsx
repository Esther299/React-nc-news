const ErrorPage = (props) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    getData()
      .then((stuff) => {
        // do stuff
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  if (error) {
    return <ErrorComponent message={error.something.keyForTheErrorMessage} />;
  }
  return <Stuff />;
};

export default ErrorPage;

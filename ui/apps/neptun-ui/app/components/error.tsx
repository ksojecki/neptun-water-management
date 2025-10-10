type ErrorProps = {
  message: string
}

export const Error = ({message} : ErrorProps) => {
  return (
    <div className="content-center h-[100%]">
      <div className="object-center grid grid-cols-1 p-4">
        <div className="rounded-xl bg-error p-4 text-error-content">
          <h1 className="text-3xl mb-4">
            <b>Error</b>
          </h1>
          <div className="bg-neutral text-neutral-content p-4">
            <pre>{message}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

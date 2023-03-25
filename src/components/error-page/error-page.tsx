import { useRouteError } from "react-router-dom";
import { LinkButton, PageHeadline, PageLayout } from "../../App";
import { TileSerializeError } from "../../utils/tile-grid/serialize-grid/serialize-tile";

function getHumanErrorMessage(e: unknown) {
  if (e instanceof TileSerializeError) {
    return "The Grid in the URL is not valid.";
  }

  return "Something totally unforeseen happened.";
}

export function ErrorPage() {
  const error = useRouteError();

  return (
    <PageLayout className="bg-red-400 text-white">
      <div className="flex-1 sm:flex-grow-0">
        <PageHeadline className="flex items-center gap-1">
          <div className="mt-1.5 text-red-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <span>Something went wrong</span>
        </PageHeadline>

        <p className="mt-2 sm:mt-8">{getHumanErrorMessage(error)}</p>
      </div>

      <div className="flex justify-end">
        <LinkButton
          to="/"
          className="bg-red-700 text-neutral-50 hover:bg-neutral-600"
        >
          Start over
        </LinkButton>
      </div>
    </PageLayout>
  );
}

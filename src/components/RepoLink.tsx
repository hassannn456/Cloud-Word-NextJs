interface Repository {
  title: string;
  description: string;
  href: string;
}

interface RepositoryProps {
  repository: Repository;
}

const repositories: Repository[] = [
  {
    title: "Front End Repo",
    description: "Front-end code repository with NEXTJS+ TYPESCRIPT + TAILWIND",
    href: "https://github.com/hassannn456/Cloud-Word-NextJs",
  },
  {
    title: "Backend Repo",
    description: "Back-end code repository with GRAPHQL + MONGOOSE + MONGODB",
    href: "https://github.com/hassannn456/Word-Cloud-Backend",
  },
];

const RepoLink = ({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) => (
  <a
    href={href}
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const RepoCard = ({ repository }: RepositoryProps) => (
  <RepoLink href={repository.href}>
    <h2 className="mb-3 text-2xl font-semibold">
      {repository.title}{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className="m-0 text-sm opacity-50">{repository.description}</p>
  </RepoLink>
);

const Repositories: React.FC = () => {
  return (
    <div className="mb-40 lg:mb-8 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2">
      {repositories.map((repository, index) => (
        <RepoCard key={index} repository={repository} />
      ))}
    </div>
  );
};

export default Repositories;

import { generateRandomString } from "@/src/utils/random-string-generator";
import Link from "next/link";

export default function Home() {
  const routes = [generateRandomString(16), generateRandomString(16), generateRandomString(16), generateRandomString(16)]

  return (
      <div className="z-10 w-full max-w-5xl text-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4">
          <p>Welcome to the WebSocket Demo App</p>
          <p>Click on any of the links below to navigate to a private topic page</p>
          {routes.map(route => (
              <Link
                key={route}
                href={`/private/${route}`}
                className="text-blue-500 hover:underline"
              >
                private/{route}
              </Link>
          ))}
          <p>or choose your own path. Navigate to any path under <i>/private</i> and test the automation.</p>
          </div>
      </div>
  );
}

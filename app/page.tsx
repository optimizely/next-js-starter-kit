"use client";

import { OptimizelyConfig } from "@optimizely/optimizely-sdk";
import {
  OptimizelyProvider,
  ReactSDKClient,
  createInstance,
} from "@optimizely/react-sdk";
import { useEffect, useState } from "react";
import { Decision } from "./components/decision";
import FlagsOffMessage from "./components/flags-off-message";
import { Pre } from "./components/pre";

const optimizelyClient: ReactSDKClient = createInstance({
  sdkKey: "DSm2zAkSJkAdTYMzQuN6E",
});

const userIds: string[] = [];
while (userIds.length < 10) {
  // to get rapid demo results, generate an array of random users. Each user always sees the same variation unless you reconfigure the flag rule.
  userIds.push((Math.floor(Math.random() * 999999) + 100000).toString());
}

function Page() {
  const [hasOnFlag, setHasOnFlag] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isClientReady, setIsClientReady] = useState<Boolean>(false);
  const [projectId, setProjectId] = useState<string>();

  useEffect(() => {
    optimizelyClient.onReady().then(() => {
      setIsDone(true);
      if (isClientValid()) {
        setIsClientReady(true);
        setProjectID(optimizelyClient.getOptimizelyConfig());
      }
    });
  }, []);

  const isClientValid = (): boolean => {
    return optimizelyClient.getOptimizelyConfig() !== null;
  };

  const setProjectID = (optimizelyConfig: OptimizelyConfig | null): void => {
    if (!optimizelyConfig) return;
    const datafile = JSON.parse(optimizelyConfig.getDatafile());
    setProjectId(datafile.projectId);
  };

  return (
    <OptimizelyProvider
      optimizely={optimizelyClient}
      // Generally React SDK runs for one client at a time i.e for one user throughout the lifecycle.
      // You can provide the user Id here once and the SDK will memoize and reuse it throughout the application lifecycle.
      // For this example, we are simulating 10 different users so we will ignore this and pass override User IDs to the useDecision hook for demonstration purpose.
      user={{ id: "default_user" }}
    >
      <pre>Welcome to our Quickstart Guide!</pre>
      {isClientReady && (
        <>
          {userIds.map((userId) => (
            <Decision
              key={userId}
              userId={userId}
              setHasOnFlag={setHasOnFlag}
            />
          ))}
          <br />
          {!hasOnFlag && projectId && <FlagsOffMessage projectId={projectId} />}
        </>
      )}
      {isDone && !isClientReady && (
        <Pre>
          Optimizely client invalid. Verify in Settings -{">"} Environments that
          you used the primary environment's SDK key
        </Pre>
      )}
    </OptimizelyProvider>
  );
}

export default Page;

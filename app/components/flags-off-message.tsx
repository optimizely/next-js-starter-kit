import Pre from "./pre";

interface FlagsOffMessageType {
  projectId: string;
}

export const FlagsOffMessage: React.FC<FlagsOffMessageType> = (
  props: FlagsOffMessageType
) => {
  const { projectId } = props;
  const navLink = `https://app.optimizely.com/v2/projects/${projectId}/settings/implementation`;
  return (
    <div>
      <Pre>Flag was off for everyone. Some reasons could include:</Pre>
      <Pre>
        1. Your sample size of visitors was too small. Rerun, or increase the
        iterations in the FOR loop
      </Pre>
      <Pre>
        2. By default you have 2 keys for 2 project environments (dev/prod).
        Verify in Settings{">"}Environments that you used the right key for the
        environment where your flag is toggled to ON.
      </Pre>
      <Pre>
        Check your key at <a href={navLink}>{navLink}</a>
      </Pre>
      <br />
    </div>
  );
};

export default FlagsOffMessage;

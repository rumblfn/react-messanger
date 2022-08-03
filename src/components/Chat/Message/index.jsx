import { TimeDateMiddle } from "./Date";
import { SimpleFile } from "./File";
import { ImageBox } from "./Image";
import { Reply } from "./Reply";
import { TextBox } from "./Text";
import { VideoBox } from "./Video";

export const Message = ({ friend, message }) => {
  const messageMargins =
    message.to === friend.userid
      ? "0.25rem 0 0.25rem auto !important"
      : "0.25rem auto 0.25rem 0 !important";

  const bgColor = message.to === friend.userid ? "blue.100" : "gray.100";

  const leftPositioning = message.to === friend.userid ? "-40px" : "";
  const rightPositioning = message.to === friend.userid ? "" : "-40px";
  const formattedTime = message?.formattedTime;

  const TimeParams = {
    formattedTime,
    left: leftPositioning,
    right: rightPositioning,
  };

  switch (message?.type) {
    case "time":
      return <TimeDateMiddle time={message?.time} />;
    case "IMAGE":
      TimeParams.left = message.to === friend.userid ? "0px" : "";
      TimeParams.right = message.to === friend.userid ? "" : "0px";
      return (
        <ImageBox
          filename={message?.content}
          margins={messageMargins}
          TimeParams={TimeParams}
        />
      );
    case "VIDEO":
      TimeParams.left = message.to === friend.userid ? "-56px" : "";
      TimeParams.right = message.to === friend.userid ? "" : "-42px";
      return (
        <VideoBox
          filename={message?.content}
          margins={messageMargins}
          TimeParams={TimeParams}
          bgColor={bgColor}
        />
      );
    case "FILE":
      TimeParams.left = message.to === friend.userid ? "-56px" : "";
      TimeParams.right = message.to === friend.userid ? "" : "-42px";
      return (
        <SimpleFile
          filename={message?.content}
          margins={messageMargins}
          TimeParams={TimeParams}
          bgColor={bgColor}
        />
      );
    case "MESSAGE":
      return (
        <TextBox
          text={message.content}
          margins={messageMargins}
          bgColor={bgColor}
          TimeParams={TimeParams}
        />
      );
    case "REPLY":
      return (
        <Reply
          message={message}
          margins={messageMargins}
          bgColor={bgColor}
          TimeParams={TimeParams}
        />
      );
    default:
      return null;
  }
};

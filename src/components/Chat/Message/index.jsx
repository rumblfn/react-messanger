
import { TimeDateMiddle } from "./Date";
import { SimpleFile } from "./File";
import { ImageBox } from "./Image";
import { TextBox } from "./Text";
import { VideoBox } from "./Video";

export const Message = ({ friend, message }) => {
  const messageMargins =
    message.to === friend.userid
      ? "0.5rem 0 0 auto !important"
      : "0.5rem auto 0 0 !important";

  const bgColor = message.to === friend.userid ? "blue.100" : "gray.100";

  const leftPositioning = message.to === friend.userid ? "-40px" : "";
  const rightPositioning = message.to === friend.userid ? "" : "-40px";
  const formattedTime = message?.formattedTime;

  const TimeParams = {
    formattedTime,
    left: leftPositioning,
    right: rightPositioning,
  };

  const handleContextMenu = e => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
  }

  switch (message?.type) {
    case "time":
      return <TimeDateMiddle time={message?.time} />;
    case "IMAGE":
      TimeParams.left = message.to === friend.userid ? "0px" : "";
      TimeParams.right = message.to === friend.userid ? "" : "0px";
      return (
        <ImageBox handleContextMenu={handleContextMenu}
          filename={message?.content}
          margins={messageMargins}
          TimeParams={TimeParams}
        />
      );
    case "VIDEO":
      TimeParams.left = message.to === friend.userid ? "-56px" : "";
      TimeParams.right = message.to === friend.userid ? "" : "-42px";
      return (
        <VideoBox handleContextMenu={handleContextMenu}
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
        <SimpleFile handleContextMenu={handleContextMenu}
          filename={message?.content}
          margins={messageMargins}
          TimeParams={TimeParams}
          bgColor={bgColor}
        />
      );
    case "MESSAGE":
      return (
        <TextBox handleContextMenu={handleContextMenu}
          text={message.content}
          margins={messageMargins}
          bgColor={bgColor}
          TimeParams={TimeParams}
        />
      );
    default:
      return null;
  }
};

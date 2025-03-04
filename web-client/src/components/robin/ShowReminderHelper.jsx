import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/robin/show-reminder.module.scss";

const getOrdinalSuffix = (num) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const mod10 = num % 10;
  const mod100 = num % 100;

  if (mod100 >= 11 && mod100 <= 13) {
    return `${num}th`;
  }

  return `${num}${suffixes[mod10] || "th"}`;
};

const parseRawTime = (rawTime) => {
  try {
    const time = rawTime.split(": ")[1].trim();
    const timeWithoutSpaces = time.split(" ").join("");
    const result = { time, timeWithoutSpaces };

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const parseTimes = (times) => {
  try {
    const rawTimes = times.split("/").map((item) => item.trim());
    const [rawDoorTime, rawShowTime] = rawTimes;
    const { time: doorTime, timeWithoutSpaces: doorTimeWithoutSpaces } = parseRawTime(rawDoorTime);
    const { time: showTime, timeWithoutSpaces: showTimeWithoutSpaces } = parseRawTime(rawShowTime);
    const result = { showTime, doorTime, doorTimeWithoutSpaces, showTimeWithoutSpaces };

    return result;
  } catch (error) {
    console.error(error);
    return {
      showTime: "???",
      doorTime: "???",
      doorTimeWithoutSpaces: "???",
      showTimeWithoutSpaces: "???",
    };
  }
};

const ShowReminderHelper = () => {
  const location = useLocation();
  const item = location.state?.item;

  const [title, setTitle] = useState(item.title);
  const fullDayOfWeek = DateTime.fromObject({ weekday: item.dayOfWeek }).toFormat("cccc");
  const shortDayOfWeek = DateTime.fromObject({ weekday: item.dayOfWeek }).toFormat("ccc").toUpperCase();

  const { showTime, showTimeWithoutSpaces, doorTime, doorTimeWithoutSpaces } = parseTimes(item.times);

  const month = DateTime.fromObject({ month: item.month }).toFormat("LLLL");
  const day = getOrdinalSuffix(item.day);

  const constructSubjectLine = (showTitle) => {
    const subjectLine = `SHOW REMINDER: ${showTitle} on ${shortDayOfWeek}, ${month} ${day} @ ${showTime}`;

    return subjectLine;
  };

  const constructHtml = (showTitle) => {
    const html = `<p style="text-align: left;">Dear Friends,</p><p style="text-align: left;">We're looking forward to seeing you for <b>${showTitle}</b> on <b>${fullDayOfWeek}, ${month} ${day}</b> at <b>${showTimeWithoutSpaces}</b>. Doors will open at ${doorTimeWithoutSpaces}.</p>`;

    return html;
  };

  const constructPlainText = (showTitle) => {
    const plainText = `Dear Friends,\n\nWe're looking forward to seeing you for ${showTitle} on ${fullDayOfWeek}, ${month} ${day} at ${showTimeWithoutSpaces}. Doors will open at ${doorTimeWithoutSpaces}.`;

    return plainText;
  };

  const initialSubjectLine = constructSubjectLine(title);
  const [subjectLine, setSubjectLine] = useState(initialSubjectLine);

  const initialHtml = constructHtml(title);
  const [html, setHtml] = useState(initialHtml);

  const initialPlainText = constructPlainText(title);
  const [plainText, setPlainText] = useState(initialPlainText);

  const [addlEmails, setAddlEmails] = useState("rgabrielli@thefreight.org, info@thefreight.org");

  const htmlRef = useRef(null);
  const textRef = useRef(null);

  const handleChangeTitle = (e) => {
    const newTitle = e.target.value;
    const updatedHtml = constructHtml(newTitle);
    const updatedSubjectLine = constructSubjectLine(newTitle);
    const updatedPlainText = constructPlainText(newTitle);

    setTitle(newTitle);
    setSubjectLine(updatedSubjectLine);
    setHtml(updatedHtml);
    setPlainText(updatedPlainText);
  };

  const autoResize = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize(htmlRef.current);
  }, [html]);

  useEffect(() => {
    autoResize(textRef.current);
  }, [plainText]);

  const textAreaClassNames = `${styles.code} w-full bg-white text-black p-2`;

  return (
    <section
      id={styles.showReminder}
      className="w-full max-w-7xl px-4 md:px-8 lg:px-16 xl:px-24 mx-auto bg-gray-100 py-8"
    >
      <form>
        <label htmlFor="title" className="block mt-4">
          Title of show:
        </label>
        <input id="title" value={title} className="text-[1.2rem] w-full p-2" onChange={handleChangeTitle} />
        <label htmlFor="subject-line" className="block mt-4">
          Subject line:
        </label>
        <input id="subject-line" value={subjectLine} className={`${styles.code} w-full p-2`} readOnly />
        <label htmlFor="html" className="block mt-4">
          Show reminder html:
        </label>
        <textarea
          id="html"
          ref={htmlRef}
          value={html}
          className={`${styles.code} w-full bg-white text-black p-2`}
          readOnly
        />
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <label htmlFor="plain-text" className="block mt-4">
          Show reminder plain text:
        </label>
        <textarea
          id="plain-text"
          ref={textRef}
          value={plainText}
          className={`${styles.code} w-full bg-white text-black p-2`}
          readOnly
        />
        <label htmlFor="addl-emails">Additional Emails:</label>
        <input id="addl-emails" value={addlEmails} className={`${styles.code} w-full p-2`} readOnly />
      </form>
    </section>
  );
};

export default ShowReminderHelper;

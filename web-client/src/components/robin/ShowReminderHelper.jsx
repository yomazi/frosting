import { DateTime } from "luxon";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/robin/show-reminder.module.scss";

const getOrdinalSuffix = (num) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const mod10 = num % 10;
  const mod100 = num % 100;

  // Handle 11-13 as special cases (they always end in "th")
  if (mod100 >= 11 && mod100 <= 13) {
    return `${num}th`;
  }

  // Otherwise, use the last digit to determine suffix
  return `${num}${suffixes[mod10] || "th"}`;
};

const ShowReminderHelper = () => {
  const location = useLocation();
  const item = location.state?.item;
  console.log(item);

  const [title, setTitle] = useState(item.title);
  const fullDayOfWeek = DateTime.fromObject({ weekday: item.dayOfWeek }).toFormat("cccc");
  const shortDayOfWeek = DateTime.fromObject({ weekday: item.dayOfWeek }).toFormat("ccc").toUpperCase();

  const month = DateTime.fromObject({ month: item.month }).toFormat("LLLL");
  const day = getOrdinalSuffix(item.day);

  const constructSubjectLine = (showTitle) => {
    const subjectLine = `SHOW REMINDER: ${showTitle} ${shortDayOfWeek}, ${month} ${day} @ X:XX`;

    return subjectLine;
  };

  const constructHtml = (showTitle) => {
    const html = `<p style="text-align: left;">We're looking forward to seeing you for <b>${showTitle}</b> on <b>${fullDayOfWeek}, ${month} ${day}</b> at <b>7:00PM</b>. Doors will open at 6:00PM.</p>`;

    return html;
  };

  const constructPlainText = (showTitle) => {
    const plainText = `We're looking forward to seeing you for ${showTitle} on ${fullDayOfWeek}, ${month} ${day} at 7:00PM. Doors will open at 6:00PM.`;

    return plainText;
  };

  const initialSubjectLine = constructSubjectLine(title);
  const [subjectLine, setSubjectLine] = useState(initialSubjectLine);

  const initialHtml = constructHtml(title);
  const [html, setHtml] = useState(initialHtml);

  const initialPlainText = constructPlainText(title);
  const [plainText, setPlainText] = useState(initialPlainText);

  const handleChangeTitle = (e) => {
    const newTitle = e.target.value;
    const updatedSubjectLine = constructSubjectLine(newTitle);
    const updatedHtml = constructHtml(newTitle);
    const updatedPlainText = constructPlainText(newTitle);

    setTitle(newTitle);
    setSubjectLine(updatedSubjectLine);
    setHtml(updatedHtml);
    setPlainText(updatedPlainText);
  };

  const handleNothing = () => {};

  const textInputClassNames = `${styles.textInput} p-2`;
  const textAreaClassNames = `${styles.textArea} bg-white text-black p-2`;

  return (
    <section
      id={styles.showReminder}
      className="w-full max-w-7xl px-4 md:px-8 lg:px-16 xl:px-24 mx-auto bg-gray-100 py-8"
    >
      <img src={item.imageUrl} />
      <form>
        <label htmlFor="title" className="block mt-4">
          Title of show:
        </label>
        <input id="title" value={title} className={textInputClassNames} onChange={handleChangeTitle} />
        <label htmlFor="subject-line" className="block mt-4">
          Subject line:
        </label>
        <input
          id="subject-line"
          value={subjectLine}
          className={textInputClassNames}
          onChange={handleChangeTitle}
        />
        <label htmlFor="html" className="block mt-4">
          Show reminder html:
        </label>
        <textarea id="html" value={html} className={textAreaClassNames} onChange={handleNothing} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <label htmlFor="plain-text" className="block mt-4">
          Show reminder plain text:
        </label>
        <textarea id="plain-text" value={plainText} className={textAreaClassNames} onChange={handleNothing} />
      </form>
    </section>
  );
};

export default ShowReminderHelper;

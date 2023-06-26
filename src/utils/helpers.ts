export const generateRandomColor = () => {
  // Generate a random hexadecimal color.
  const hexColor =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  // Convert hexadecimal to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate the brightness index
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  // If brightness index is greater than 125, the color is light, so we set the text color to black.
  // If it's less than 125, the color is dark, so we set the text color to white.
  const textColor = brightness > 125 ? "black" : "white";

  // Return an object with the background color and the text color
  return { backgroundColor: hexColor, textColor: textColor };
};

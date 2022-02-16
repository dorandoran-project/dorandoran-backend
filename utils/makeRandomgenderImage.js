const makeRandomGenderImage = () => {
  const randomImage = ["1.png", "2.png"];
  const randomIndex = Math.floor(Math.random() * 2);

  return randomImage[randomIndex];
};

module.exports = makeRandomGenderImage;

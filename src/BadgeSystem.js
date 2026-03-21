export function getBadges(points) {
  const badges = [];

  if (points >= 10) badges.push("Helpful Finder");
  if (points >= 25) badges.push("Campus Hero");
  if (points >= 50) badges.push("Warrior Legend");

  return badges;
}
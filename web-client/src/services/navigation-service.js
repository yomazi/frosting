import navbarData from "../utilities/json/navbar.json";

class NavigationService {
  static getMenuItems() {
    const items = navbarData.menuItems.robin;

    return items;
  }

  static getUserItems() {
    const items = navbarData.userItems.robin;

    return items;
  }
}

export default NavigationService;

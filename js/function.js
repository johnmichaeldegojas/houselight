const el_chkLightsOn = document.querySelector(
  'input[type="checkbox"].chkLightsOn'
);
const el_lblLightsOn = document.querySelector("label.lblLightsOn + .label");
const el_colorInput = document.querySelector(".color_input");
const el_btnApplyBrightness = document.querySelector(
  ".brightness__profile__button"
);
const els_mainProfileCard = document.querySelectorAll(".card-profile");
const els_colorCard = document.querySelectorAll(".color__profiles__card");
const els_profileCard = document.querySelectorAll(".brightness__profile__card");
const el_brightnessLabel = document.querySelector(
  "label[for='brightnessLevel']"
);
const el_brightnessSlider = document.querySelector(".brightnessLevel");

//Fetching Data
function getInitialData() {
  fetch("http://localhost:8080/getDeviceInfo", {
    mode: "cors",
    origin: "http://localhost:5500/",
  })
    .then((res) => res.json())
    .then((data) => {
      initializeContents(data);
      console.dir();
    });
}

function initializeContents(data) {
  el_chkLightsOn.checked = data.power;
  if (data.power) el_lblLightsOn.innerHTML = "Lights On";
  else el_lblLightsOn.innerHTML = "Lights Off";
  el_brightnessSlider.value = data.bright;
}

//EVENTS HANDLING
function handleLightSwitchChange(e) {
  if (this.checked) el_lblLightsOn.innerHTML = "Lights On";
  else el_lblLightsOn.innerHTML = "Lights Off";
  sendCmdToDevice(`light${el_chkLightsOn.checked ? "On" : "Off"}`);
}
function handlePowerLabelClick(e) {
  el_chkLightsOn.checked = !el_chkLightsOn.checked;
  if (el_chkLightsOn.checked) el_lblLightsOn.innerHTML = "Lights On";
  else el_lblLightsOn.innerHTML = "Lights Off";
  sendCmdToDevice(`light${el_chkLightsOn.checked ? "On" : "Off"}`);
}

function handleBrightnessCardClick(e) {
  const value = this.dataset.brightness;
  el_brightnessLabel.innerHTML = `Level: ${value}%`;
  el_brightnessSlider.value = value;
  sendCmdToDevice("brightness-" + value);
}

function handleProfileCardClick(e) {
  const value = this.dataset.mode;
  console.log(value);
  sendCmdToDevice(this.dataset.mode);
}

function sendCmdToDevice(e) {
  fetch(`http://localhost:8080/${e}`);
}

function handleBrightnessSliderChange(e) {
  const value = this.value;
  el_brightnessLabel.innerHTML = `Level: ${value}%`;
}

function handleApplyBrightnessButton(e) {
  sendCmdToDevice("brightness-" + el_brightnessSlider.value);
}

function handleColorCardClick(e) {
  console.log(this.dataset);
  sendCmdToDevice("changecolor-" + this.dataset.hexcolor);
  el_colorInput.value = this.dataset.hexValue;
}

function setBrightness(value) {}

//EVENTS LISTENERS
el_chkLightsOn.addEventListener("change", handleLightSwitchChange);
el_btnApplyBrightness.addEventListener("click", handleApplyBrightnessButton);
el_lblLightsOn.addEventListener("click", handlePowerLabelClick);
el_brightnessSlider.addEventListener("change", handleBrightnessSliderChange);
els_profileCard.forEach((el) =>
  el.addEventListener("click", handleBrightnessCardClick)
);
els_colorCard.forEach((el) =>
  el.addEventListener("click", handleColorCardClick)
);
els_mainProfileCard.forEach((el) =>
  el.addEventListener("click", handleProfileCardClick)
);

getInitialData();

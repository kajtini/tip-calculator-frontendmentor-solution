"use strict";

const billValue = document.querySelector(".bill__input");
const peopleNumber = document.querySelector(".people__input");
const customTipValue = document.querySelector(".custom__input");
const finalPersonTip = document.querySelector(".tip-value");
const finalPersonBill = document.querySelector(".total-value");
const allInputFields = document.querySelectorAll(".input");
const allTipValues = [...document.querySelectorAll(".value")];

const peopleError = document.querySelector(".people__error-msg");

const resetBtn = document.querySelector(".reset-btn");

const resetActiveStates = () => {
  allTipValues.forEach((value) => {
    value.classList.remove("value--clicked");
  });
};

const addActiveState = () => {
  allTipValues.forEach((value) => {
    value.addEventListener("click", () => {
      resetActiveStates();
      value.classList.toggle("value--clicked");
    });
  });
};

const getSelectedTip = () => {
  let tip;
  tip = allTipValues.filter((value) => {
    return value.classList.contains("value--clicked");
  })[0];

  if (tip) {
    tip = tip.textContent.replaceAll("%", "");
  }

  if (!tip) {
    tip = customTipValue.value.trim() === "" ? "0" : customTipValue.value;
  }

  return Number(tip) / 100;
};

const getInsertedBill = () => {
  return billValue.value;
};

const getNumPeople = () => {
  return Number(peopleNumber.value);
};

const calculateFinalTip = (bill, tipPercentage, numOfPeople) => {
  let finalTip;

  if (numOfPeople > 0) {
    if (Number(tipPercentage) > 100) {
      tipPercentage = 100;
    }
    finalTip = (bill * tipPercentage) / numOfPeople;
  }

  if (numOfPeople === 0 || numOfPeople < 0 || isNaN(numOfPeople)) {
    finalTip = 0;
  }

  return finalTip?.toFixed(2);
};

const calculateFinalBill = (bill, numOfPeople) => {
  let finalBill;

  if (numOfPeople > 0) {
    finalBill = bill / numOfPeople;
  }

  if (numOfPeople === 0 || numOfPeople < 0 || isNaN(numOfPeople)) {
    finalBill = 0;
  }

  return finalBill?.toFixed(2);
};

const updateVisualInfo = () => {
  finalPersonBill.innerHTML = `$${calculateFinalBill(
    getInsertedBill(),
    getNumPeople()
  )}`;
  finalPersonTip.innerHTML = `$${calculateFinalTip(
    getInsertedBill(),
    getSelectedTip(),
    getNumPeople()
  )}`;
};

const resetAllFields = () => {
  finalPersonBill.innerHTML = "$0.00";
  finalPersonTip.innerHTML = "$0.00";
  customTipValue.value = billValue.value = peopleNumber.value = "";
  peopleError.classList.add("hidden");
  peopleNumber.classList.remove("input--wrong");
  resetActiveStates();
};

const checkCustomTip = () => {
  if (Number(customTipValue.value) > 100) {
    customTipValue.value = "100";
  }
};

const validatePeopleNumber = () => {
  if (peopleNumber.value !== "") {
    if (Number(peopleNumber.value) < 1 || isNaN(peopleNumber.value)) {
      peopleError.classList.remove("hidden");
      peopleNumber.classList.add("input--wrong");

      peopleNumber.blur();
      setTimeout(() => {
        peopleNumber.focus();
        peopleNumber.classList.remove("input--wrong");
        peopleError.classList.add("hidden");
        peopleNumber.value = "";
      }, 300);
    }
  }
};

const liveUpdate = () => {
  allInputFields.forEach((input) => {
    input.addEventListener("input", () => {
      updateVisualInfo();
    });
  });
  customTipValue.addEventListener("input", () => {
    checkCustomTip();
    updateVisualInfo();
  });

  peopleNumber.addEventListener("input", validatePeopleNumber);

  allTipValues.forEach((value) => {
    value.addEventListener("click", function (e) {
      if (customTipValue.value.trim() !== "") {
        customTipValue.value = "";
      }
      updateVisualInfo();
    });
  });
};

resetBtn.addEventListener("click", function () {
  resetAllFields();
});

resetAllFields();
addActiveState();
liveUpdate();

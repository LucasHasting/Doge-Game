$(document).ready(function () {
  //set local variables
  let count = 0;
  let counter = 1;

  let barks = 1;
  let super_barks = 10000;
  let doge = 0;
  let super_doge = 0;

  let barks_count = 1;
  let super_barks_count = 0;

  let bark_cost = 5;
  let super_bark_cost = 10000;
  let doge_cost = 10;
  let super_doge_cost = 100000;

  let time = 1000;
  let super_time = 1000;

  let bark_IDs = ["bark", "barks_count", "barks: "];
  let super_bark_IDs = ["super_bark", "super_barks_count", "super barks: "];;
  let doge_IDs = ["dog", "doge_cost", "doge: "];
  let super_doge_IDs = ["super_dog", "super_doge_cost", "super doge: "];;

  //declare constants
  const COST_MULTI = 3.5;
  const count_condition = 10000000;
  const wowText = "WOW: ";

  // Click the doge
  $('#doge').click(function () {
    //update count and update count text
    count += counter;
    modify_count();
  });

  // Click the barks button
  $('#barks').click(function () {
    let barks_data = click_multipler(barks, barks_count, bark_cost, bark_IDs);
    barks = barks_data[0];
    barks_count = barks_data[1];
    bark_cost = barks_data[2];
  });

  // Click the super barks button
  $('#super_barks').click(function () {
    let super_barks_data = click_multipler(super_barks, super_barks_count, super_bark_cost, super_bark_IDs);
    super_barks = super_barks_data[0];
    super_barks_count = super_barks_data[1];
    super_bark_cost = super_barks_data[2];
  });

  // Click the doge machine button
  $('#doges').click(function () {
    let doge_data = auto_machine(doge_cost, doge, doge_IDs)
    doge_cost = doge_data[0];
    doge = doge_data[1];
  });

  // Click the super doge machine button
  $('#super_doge').click(function () {
    let super_doge_data = auto_machine(super_doge_cost, super_doge, super_doge_IDs)
    super_doge_cost = super_doge_data[0];
    super_doge = super_doge_data[1];
  });

  // function for a click multiplyer
  function click_multipler(initial, extra_count, cost, ID) {
    if (cost >= count_condition) {
      //update text
      $("#" + ID[0]).text(ID[2] + extra_count);
      $("#" + ID[1]).text("cost: finished");
      modify_count();
    }
    else if (count >= cost) {
      //update the multiplier and count
      initial *= 2;
      extra_count += 1;
      counter = initial;

      //update variables
      count -= cost;
      cost *= COST_MULTI;
      cost = Math.ceil(cost)

      //update text
      $("#" + ID[0]).text(ID[2] + extra_count);
      $("#" + ID[1]).text("cost: " + cost);
      modify_count();
    }
    return [initial, extra_count, cost];
  }

  // function for an auto multiplyer
  function auto_machine(cost, auto_variable, ID) {
    if (cost >= count_condition) {
      //update text
      $("#" + ID[0]).text(ID[2] + auto_variable);
      $("#" + ID[1]).text("cost: finished");
      modify_count();
    }
    else if (count >= cost) {
      //update variables
      auto_variable++;
      count -= cost;
      cost *= COST_MULTI;
      cost = Math.ceil(cost)

      //update text
      $("#" + ID[0]).text(ID[2] + auto_variable);
      $("#" + ID[1]).text("cost: " + cost);
      modify_count();
    }
    return [cost, auto_variable];
  }

  // calculate auto upgrade
  function auto(auto_variable, amount) {
    count += Math.ceil(auto_variable * amount / 2);
    if (auto_variable % 5 == 0)
      time /= 2;
    modify_count();
  }

  //sets auto time intervals
  window.setInterval(function () {
    auto(doge, barks);
  }, time);

  window.setInterval(function () {
    auto(super_doge, super_barks);
  }, super_time);

  // modifys the dog count and checks if the game is finished
  function modify_count() {
    if (count >= count_condition) {
      $("#count").text("WOW Overdose");
    }
    else {
      $("#count").text(wowText + count);
    }
  }
});
var num1 = [],    // using arrays to store each number separately and can combine after user clicks an operator
    num2 = [],
    operand = null,   // stores which operator the user clicks
    solved = false,   // keeps track if user has already made a calculation
    $screen = $("#screen"); // this is a cached version of a jQuery object


$(".numpad").click(function() {
  var input = $(this).html();

  if (solved) { clear(); }

  if (!operand) {
    num1.push(input);
    $screen.html(num1.join(''));
  }
  else {
    num2.push(input);
    $screen.html(num1.join('') + operand + num2.join(''));
  }

  $(this).fadeOut(100).fadeIn(100);
});


$(".operator").click(function() {
  var input = $(this).html();

  // conditional allows users to keep computing numbers off last result
  if (solved) {
    num2 = [];
    operand = null;
    solved = false;
  }
  setOperand(input);
  $(this).fadeOut(100).fadeIn(100);
});


$('#clear').click(function() {
  clear();
  $(this).fadeOut(100).fadeIn(100);
});


$("#equals").click(function() {
  if (num1 && num2 && operand) {

    var n1 = +num1.join(''),
        n2 = +num2.join(''),
        result = null;

    switch (operand) {
      case '+':
        result = n1 + n2;
        break;
      case '-':
        result = n1 - n2;
        break;
      case '*':
        result = n1 * n2;
        break;
      case '/':
        result = n1 / n2;
        break;
    }

    $screen.html(formatNum(result));
    num1 = [result]; //user can keep hitting 'enter' to continue calculations.
    num2 = [n2];
    solved = true;
  }
  $(this).fadeOut(100).fadeIn(100);
});

// helper functions for event handlers
function setOperand(symbol) {
  if (!operand) {
    operand = symbol.replace("x", "*").replace("%", "/");
    $screen.html(num1.join('') + operand);
  }
}

function clear() {
  num1 = [];
  num2 = [];
  operand = null;
  solved = false;
  $screen.html(0);
}

function formatNum(num) {
  return (num % 1 === 0) ? num : num.toFixed(4);
}

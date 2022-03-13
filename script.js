//global site variables
var menuExtended = false;
var clickerExtended = false;
var timer = 0;
var classint = 1;

//clicker variables
var opens = 0;
var clicks = 0;
var CPS = 0;
var CPC = 1;
var purchasesMenuClassint = 1;
var doSave = 1;

var cursor = {
    Price: 15,
    Own: 0,
    priceUp: 5,
    addVal: 1,
}

var cursor2 = {
    Price: 1000,
    Own: 0,
    priceUp: 500,
    addVal: 10,
}

var clicker = {
    Price: 100,
    priceAdd: 50,
    Own: 0,
}

var clickerUp = {
    Price: 1000,
    priceAdd: 500,
    Own: 1,
}

//Function for purchasing buttons
//If no adding to a variable, (eg, CPS) is required, just set addto and addamount to 0
var purchase = {
    noAdd: function(thing) {
        if (clicks >= thing.Price) {
            thing.Own += 1;
            clicks -= thing.Price;
            thing.Price += thing.priceAdd;
        }
    },
    add: {
        CPC: function(thing) {
            if (clicks >= thing.Price) {
                CPC += thing.addVal;
                clicks -= thing.Price;
                thing.Price += thing.priceUp;
                thing.Own += 1;
            }
        },
    },
}

$(document).ready(function() {
    //stuff for running on startup
    $('#class2').hide();
    $('#switcherButton1').css("background-color", "#571212");
    $('#purchasesSel1').css("background-color", "#571212");
    $('#purchasesClass2').hide();
    $('#purchasesClass3').hide();
    $('#cursorUpgradeContainer').hide();
    $('#clickerContainer').hide();
    
    $('*::-webkit-scrollbar-thumb').css('border-radius', '0px');

    //load clicker data, if there is any
    doSave = JSON.parse(localStorage.getItem('doSave'));
    if (doSave == 1) {loadFromLocalStorage();}

    //hover anim for the switcher
    $('.switcherMain').hover(function() {
        if (!menuExtended) {$(this).css("margin-left", "-280px"); console.log("closed pull");}
        if (menuExtended) {$(this).css("margin-left", "-20px"); console.log("open pull");}
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
	}, function() {
        if (!menuExtended) {$(this).css("margin-left", "-290px"); console.log("closed push");}
        if (menuExtended) {$(this).css("margin-left", "-30px"); console.log("open push");}
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
	});

    //pull out the switcher/push back the switcher
    $('.switcherMain').click(function() {
        if (!menuExtended && timer == 0) {
            $(this).css("margin-left", "-20px"); 
            menuExtended = true;
            timer = 2;
        }
        if (menuExtended && timer == 0) {
            $(this).css("margin-left", "-280px");
            menuExtended = false;
            timer = 2;
        }
    });

    //hover anim for switcher buttons
    $('.switcherButton').hover(function() {
        $(this).css("background-color", "#680000");
        $(this).css("transform", "scale(1.2)");
    }, function() {
        $(this).css("background-color", "#353535");
        $(this).css("transform", "scale(1)");
        switch (classint) {
            case 1:
                $('#switcherButton1').css("background-color", "#571212");
                break;
            case 2:
                $('#switcherButton2').css("background-color", "#571212");
                break;
        }
    });

    //switcher button code
    $('#switcherButton1').click(function() {
        $('#switcherButton2').css("background-color", "#353535");
        $('#class1').show();
        $('#class2').hide();
        classint = 1;
    });
    $('#switcherButton2').click(function() {
        $('#switcherButton1').css("background-color", "#353535");
        $('#class1').hide();
        $('#class2').show();
        classint = 2;
    });

    console.log($('.switcherButton').hover())

    //timer so our click function dosen't loop every time by getting run twice on one update
    function updateTimer() {
        if (timer > 0) {timer -= 1};
    }
    updateTimer();
    setInterval(updateTimer, 1);

    //image hover code
    $('.img1080').hover(function() {
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
        $(this).css("transform", "scale(1.1)");
        $(this).css("z-index", "2");
    }, function() {
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
        $(this).css("transform", "scale(1)");
        $(this).css("z-index", "1");
    });

    $('.imgPhone').hover(function() {
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
        $(this).css("transform", "scale(1.1)");
        $(this).css("z-index", "2");
    }, function() {
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
        $(this).css("transform", "scale(1)");
        $(this).css("z-index", "1");
    });

    $('.img1K').hover(function() {
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
        $(this).css("transform", "scale(1.1)");
        $(this).css("z-index", "2");
    }, function() {
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
        $(this).css("transform", "scale(1)");
        $(this).css("z-index", "1");
    });

    //below here is
    //code for the clicker

    //hover anim for the clicker
    $('.clickerMain').hover(function() {
        if (!clickerExtended) {$(this).css("margin-top", "-765px"); /*console.log("closed pull");*/}
        if (clickerExtended) {$(this).css("margin-top", "-21px"); /*console.log("open pull");*/}
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
	}, function() {
        if (!clickerExtended) {$(this).css("margin-top", "-775px"); /*console.log("closed push");*/}
        if (clickerExtended) {$(this).css("margin-top", "-30px"); /*console.log("open push");*/}
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
	});

    //open the clicker when the nesting div is clicked
    $('.clickerMain').click(function() {
        if (!clickerExtended && timer == 0) {
            $(this).css("margin-top", "-21px"); 
            $(this).css("padding-bottom", "0px");
            clickerExtended = true;
            opens += 1;
            timer = 2;
        }
    });

    //close the clicker when the close button gets pressed (to prevent clicking buttons in the UI from closing the game)
    $('#closeClickerButton').click(function() {
        if (clickerExtended && timer == 0) {
            $('.clickerMain').css("margin-top", "-765px");
            $('.clickerMain').css("padding-bottom", "20px");
            clickerExtended = false;
            timer = 2;
        }
    });

    //hey look it's the code for the button the game revolves around
    $('#clickButton').click(function() {
        clicks += CPC;
    });

    //button hover code
    $('#clickButton').hover(function() {
        $(this).css('background-color', '#680000');
        $(this).css("transform", "scale(1.2)");
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
    }, function() {
        $(this).css('background-color', '#571212');
        $(this).css("transform", "scale(1)");
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
    });

    $('.clickerButton').hover(function() {
        $(this).css('background-color', '#680000');
        $(this).css("transform", "scale(1.2)");
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
    }, function() {
        $(this).css('background-color', '#571212');
        $(this).css("transform", "scale(1)");
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
    });

    $('.purchasesClassSelButton').hover(function() {
        $(this).css('background-color', '#680000');
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0.2)");
    }, function() {
        $(this).css('background-color', '#202020');
        $(this).css("box-shadow", "10px 10px 16px 0px rgba(0,0,0,0)");
        switch (purchasesMenuClassint) {
            case 1:
                $('#purchasesSel1').css("background-color", "#571212");
                break;
            case 2:
                $('#purchasesSel2').css("background-color", "#571212");
                break;
            case 3:
                $('#purchasesSel3').css("background-color", "#571212");
                break;
        }
    });

    //Purchasing tab menu switching
    $('#purchasesSel1').click(function() {
        purchasesMenuClassint = 1;
        $('#purchasesSel2').css("background-color", '#202020');
        $('#purchasesSel3').css("background-color", '#202020');
        $('#purchasesClass1').show();
        $('#purchasesClass2').hide();
        $('#purchasesClass3').hide();
    });
    $('#purchasesSel2').click(function() {
        purchasesMenuClassint = 2;
        $('#purchasesSel1').css("background-color", '#202020');
        $('#purchasesSel3').css("background-color", '#202020');
        $('#purchasesClass1').hide();
        $('#purchasesClass2').show();
        $('#purchasesClass3').hide();
    });
    $('#purchasesSel3').click(function() {
        purchasesMenuClassint = 3;
        $('#purchasesSel1').css("background-color", '#202020');
        $('#purchasesSel2').css("background-color", '#202020');
        $('#purchasesClass1').hide();
        $('#purchasesClass2').hide();
        $('#purchasesClass3').show();
    });

    //code for opening purchase menus when the user hovers over one
    $('.purchaseContainer').hover(function() {
        $(this).css('background-color', '#571212');
        $(this).css('color', 'white');
        $(this).css('height', '200px');
        $(this).css("box-shadow", "5px 5px 16px 0px rgb(0 0 0 / 20%)");
        $(this).css("overflow-y", "scroll");
    }, function() {
        $(this).css('background-color', '#979797');
        $(this).css('color', 'black');
        $(this).css('height', '60px');
        $(this).css("box-shadow", "inset 5px 5px 16px 0px rgb(0 0 0 / 20%)");
        $(this).css("overflow-y", "hidden");
    });

    //hide/unhide necascarry elements for the purchase menu to look ok
    $('#cursorUpgrade').hover(function() {
        $('#cursorUpgradeContainer').show();
        $('#clickerUpgrade').css("margin-top", "-210px");
    }, function() {
        $('#cursorUpgradeContainer').hide();
        $('#clickerUpgrade').css("margin-top", "-70px");
    });
    $('#clickerUpgrade').hover(function() {
        $('#clickerUpgradeContainer').show();
    }, function() {
        $('#clickerUpgradeContainer').hide();
    });

    $('#clicker').hover(function() {
        $('#clickerContainer').show();
    }, function() {
        $('#clickerContainer').hide();
    });

    //do some math so that the upgrade/machine actually works (math has been moved into functions defined with variables)
    $('#cursorButton').click(function() {purchase.add.CPC(cursor);});
    $('#clickerPurchaseButton').click(function() {purchase.noAdd(clicker);});
    $('#clickerUButton').click(function() {purchase.noAdd(clickerUp);});
    $('#cursor2Button').click(function() {purchase.add.CPC(cursor2);});

    //update the text, as well as some other running code to check things
    function clickerTextUpdate() {
        $('#clickDisplay').html("Clicks: " + (Math.round(clicks)).toLocaleString('de'));
        $('#clickPerSecondDisplay').html("Clicks Per Second: " + (CPS).toLocaleString('de'));
        $('#clickPerClickDisplay').html("Clicks Per Click: " + (CPC).toLocaleString('de'));
        $('#cursorUpgradeOwnDSP').html("You Own: " + (cursor.Own).toLocaleString('de'));
        $('#cursorButton').html("Purchase: " + (cursor.Price).toLocaleString('de'));
        $('#clickerOwnDSP').html("You Own: " + (clicker.Own).toLocaleString('de'));
        $('#clickerPurchaseButton').html("Purchase: " + (clicker.Price).toLocaleString('de'));
        $('#clickerUpgradeOwnDSP').html("You Own: " +  (clickerUp.Own-1).toLocaleString('de'));
        $('#clickerUButton').html("Purchase: " + (clickerUp.Price).toLocaleString('de'));
        $('#cursorUpgrade2OwnDSP').html("You Own: " + (cursor2.Own).toLocaleString('de'));
        $('#cursor2Button').html("Purchase: " + (cursor2.Price).toLocaleString('de'));
        if (clickerExtended) {$('#closedClickDisplay').html(" ")} else {$('#closedClickDisplay').html("Clicks: " + (Math.round(clicks)).toLocaleString('de'))}
        if (opens <= 0) {$('#closedClickDisplay').html("Click me to open the clicker!")}
        if (clicker.Own > 0) {
            CPS = clicker.Own * clickerUp.Own;
            //for the future,
            //CPS += machine * machineMultiplier
        }
        clicks += CPS/100
    }
    clickerTextUpdate();
    setInterval(clickerTextUpdate, 10);

    function secondUpdater() {saveToLocalStorage();}
    secondUpdater();
    setInterval(secondUpdater, 1000);
});

function saveToLocalStorage() {
    doSave = 1;
    localStorage.setItem('opens', JSON.stringify(opens));
    localStorage.setItem('doSave', JSON.stringify(doSave));
    localStorage.setItem('clicks', JSON.stringify(clicks));
    localStorage.setItem('CPC', JSON.stringify(CPC));
    localStorage.setItem('cursorUpgradePrice', JSON.stringify(cursor.Price));
    localStorage.setItem('cursorUpgradeOwn', JSON.stringify(cursor.Own));
    localStorage.setItem('clickerPrice', JSON.stringify(clicker.Price));
    localStorage.setItem('clickerOwn', JSON.stringify(clicker.Own));
    localStorage.setItem('clickerUpOwn', JSON.stringify(clickerUp.Own));
    localStorage.setItem('clickerUPrice', JSON.stringify(clickerUp.Price));
    localStorage.setItem('cursorU2Own', JSON.stringify(cursor2.Own));
    localStorage.setItem('cursorU2Price', JSON.stringify(cursor2.Price));
    //console.log("Data Saved!");
}

function loadFromLocalStorage() {
    //load the data from local storage
    opens = JSON.parse(localStorage.getItem('opens'));
    clicks = JSON.parse(localStorage.getItem('clicks'));
    CPC = JSON.parse(localStorage.getItem('CPC'));
    cursor.Price = JSON.parse(localStorage.getItem('cursorUpgradePrice'));
    cursor.Own = JSON.parse(localStorage.getItem('cursorUpgradeOwn'));
    clicker.Price = JSON.parse(localStorage.getItem('clickerPrice'));
    clicker.Own = JSON.parse(localStorage.getItem('clickerOwn'));
    clickerUp.Own = JSON.parse(localStorage.getItem('clickerUpOwn'));
    clickerUp.Price = JSON.parse(localStorage.getItem('clickerUPrice'));
    cursor2.Own = JSON.parse(localStorage.getItem('cursorU2Own'));
    cursor2.Price = JSON.parse(localStorage.getItem('cursorU2Price'));
    console.log("Data Loaded!")
}
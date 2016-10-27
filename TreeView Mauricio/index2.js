/**
 * Created by maflorez on 2016/10/24.
 */

jQuery.getJSON('countries.json', function (aData) {

    function getFirstKey(aData) {
        for (var sName in aData) {
            return sName;
        }
    }

    function drawTree(aData){
        var oBranch = $('<ul></ul>');
        for(var iKey in aData){
            var sKeyName = getFirstKey(aData[iKey]);
            var oList = $('<li><input type="checkbox"><span>' + sKeyName + '</span></li>');

            if(aData[iKey][sKeyName].length > 0){
                oList.prepend('<span class="collapse">&minus;</span>');
                oList.append(drawTree(aData[iKey][sKeyName]));
            }
            oBranch.append(oList);
        }
        return oBranch;
    }

    $('html').append(drawTree(aData));

    $('input').click(function () {
        validarCheck($(this));
    });

    $('span.collapse').click(function () {
            var oNode = $(this);
            console.log($(this));
            oNode.next().next().next().toggle();
            oNode.html(oNode.html() == '+' ? '&minus;' : '+');
        });

    function validarCheckParent(oNode) {
        var oParent = oNode.parent().parent();

        oInputParent = oParent.prev().prev();
        if(oInputParent.length > 0) {
            var iState = 0;
            oParent.find('>li>input').each(function (iKey, oInput) {
                iState |= $(oInput).prop('checked') ? 2 : ($(oInput).prop('indeterminate') ? 4 : 1);
            });
            console.log()
            if (iState >= 3) {
                //oInputParent.prop('checked', false);
                oInputParent.prop('indeterminate', true);
            } else {
                oInputParent.prop('indeterminate', false);
                oInputParent.prop('checked', iState == 2);
            }
            validarCheckParent(oInputParent);
        }
    }

    function validarCheck(oNode){

        oNode.next().next().find('input').prop('indeterminate', false);
        oNode.next().next().find('input').prop('checked', oNode.prop('checked'));

        validarCheckParent(oNode);
    }

});

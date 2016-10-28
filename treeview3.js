var $suLu = $('<ul class="treeview"><input type="checkbox" id="suLu">Don Papá<span> - </span></ul>');

$.getJSON("Tree.json", function($data){

    for(j=0; j<$data.length; j++){
        $suLu.append(draw($data[j]));
    }
    $('body').append($suLu);

    function draw($data) {
        var $ul = $('<ul></ul>').append('<input type="checkbox">' + $data.name );
        if($data.sons.length > 0){
            $ul.append('<span> - 🔎 </span>');
            for (var i = 0; i<$data.sons.length; i++){
                $ul.append(draw($data.sons[i]));
            }
        }
        return $ul;
    }

    $('span').click(function () {
        var $this = $(this);
        $this.parent().find('ul').toggle('slow');
        if($this.text() == ' - '){
            $this.text(' + ');
        }else{
            $this.text(' - ');
        }
    });
    $('input').click(function () {
        var $this = $(this);
        $this.parent().find('input').prop('checked', $this.is(':checked')).prop('indeterminate', false);
        cont($this);

    });

    function cont($this) {
        var inputVector = $this.parent().parent().find('input').not('input:first');
        var $checkBoxMaster = $this.parent().parent().find('input:first');
        var conter = 0;
        for(i=0; i < inputVector.length; i++){
            if($(inputVector[i]).prop('checked')){
                conter++;
            }
            if(conter>0){
                $checkBoxMaster.prop('indeterminate', true);
            }else{
                $checkBoxMaster.prop('indeterminate', false);
            }
        }
        if (conter == inputVector.length){
            $checkBoxMaster.prop('indeterminate', false).prop('checked', true);
        }else{
            $checkBoxMaster.prop('checked', false);
        }
        if(!$($this.parent().parent()).hasClass('treeview') ){
            cont($($checkBoxMaster));
        }
    }
});


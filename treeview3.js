var $suLu = $('<ul class="treeview"><input type="checkbox" id="suLu">Don Papá<span> - </span></ul>').append('<ul>');
$.getJSON("Tree.json", function($data){

    for(j=0; j<$data.length; j++){
        $($suLu.find('ul')).append(draw($data[j]));
    }
    $('body').append($suLu);

    function draw($data) {
        var $li = $('<li></li>').append('<input type="checkbox">' + '<name>' + $data.name +'</name>' ).css('list-style-type', 'none');
        if($data.sons.length > 0){
            $li.append('<span> - </span>').append("<mGlass>🔎</mGlass>").addClass("papa");
            var tempUl = $('<ul>');
            for (var i = 0; i<$data.sons.length; i++){
                tempUl.append(draw($data.sons[i]))
            }
            $li.append(tempUl);
        }else{
            $li = $('<li></li>').append('<input type="checkbox">' + '<name>' + $data.name +'</name>' ).css('list-style-type', 'none');
        }
        return $li;
    }

    var $mGlass = $('mGlass');

    $mGlass.click(function () {
        var $this = $(this);
        var father = $('<div>').css({
            "background" : "orange"
        });
        console.log($('.papa').has('name'));
        console.log($($this.parent().find('name').not()));
        father.append($this.parent().find('name').clone());
        $suLu.append(father);
    });



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
        checkedBox($this);

    });

    function checkedBox($this) {
        var $parent = $this.parents().eq(2).find('input:first');
        console.log($this);
        if(!$this.parents().eq(2).hasClass('treeview')){
            if(!$this.parent().hasClass('treeview')){
                $parent.prop('indeterminate', true);
            }
            checkedBox($parent);
        }



        // checkedBox($parent);

        // var inputVector = $this.parent().parent().find('input').not('input:first');
        // var $checkBoxMaster = $this.parent().parent().find('input:first');
        // var conter = 0;
        // for(i=0; i < inputVector.length; i++){
        //     if($(inputVector[i]).prop('checked')){
        //         conter++;
        //     }
        //     if(conter>0){
        //         $checkBoxMaster.prop('indeterminate', true);
        //     }else{
        //         $checkBoxMaster.prop('indeterminate', false);
        //     }
        // }
        // if (conter == inputVector.length){
        //     $checkBoxMaster.prop('indeterminate', false).prop('checked', true);
        // }else{
        //     $checkBoxMaster.prop('checked', false);
        // }
        //
        // if(!$($this.parent().parent()).hasClass('treeview') ){
        //     cont($($checkBoxMaster));
        // }
    }

});


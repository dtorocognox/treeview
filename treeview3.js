var $suLu = $('<ul class="treeview"><input type="checkbox" id="suLu">Don Papá<span> - </span></ul>').append('<ul>');

$.getJSON("Tree.json", function($data){

    for(j=0; j<$data.length; j++){
        $($suLu.find('ul:eq(0)')).append(draw($data[j]));
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
        if(!($this.attr('id') == "suLu")){
            indeterminateBox($this);
        }
        completeBox($this);

        function indeterminateBox($this) {
            var $parent = $this.parents().eq(2).find('input:first');
            $parent.prop('indeterminate', true);
            if($this.parents().eq(2).hasClass('treeview') || ($this.attr('id') == "suLu")){
                return false;
            }
            indeterminateBox($parent);
        }

        function completeBox($this) {
            if($this.prop('id') == 'suLu'){
                return false;
            }
            var inputVector = $this.parent().parent().find('input');
            for(k=0; k<inputVector.length; k++){
                if(!$(inputVector[k]).prop('checked')){
                    return false;
                }
            }
            $this.parents().eq(2).find('input:first').prop({
                'indeterminate' : false,
                'checked': true
            });
            console.log($this.parents().eq(3).find('input:first'));

            completeBox($this.parents().eq(3).find('input:first'));
        }
    });


    $('mGlass').click(function () {
        // var $this = $(this);
        // var father = $('<div>').css({
        //     "background" : "orange"
        // });
        // console.log($('.papa').has('name'));
        // console.log($($this.parent().find('name').not()));
        // father.append($this.parent().find('name').clone());
        // $suLu.append(father);
    });




});


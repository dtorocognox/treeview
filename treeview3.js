var $suLu = $('<ul class="treeview"><input type="checkbox" id="suLu">Don Papá<span> - </span></ul>').append('<ul>');
$.getJSON("Tree.json", function($data){

    for(j=0; j<$data.length; j++){
        $($suLu.find('ul:eq(0)')).append(draw($data[j]));
    }
    $('body').append($suLu).append($('<ul id="copy">'));

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
        nullBox($this);

        function nullBox($this){
            var inputVector = $this.parent().parent().find('input');
            var cont =0;
            for(k=0; k<inputVector.length; k++){
                if($(inputVector[k]).prop('checked')){
                    cont++;
                }
            }
            if(cont == 0) {
                $this.parents().eq(2).find('input:first').prop('indeterminate', false);
            }
            if($this.parents().eq(2).hasClass('treeview') || ($this.attr('id') == "suLu")){
                return false;
            }
            nullBox($this.parents().eq(2).find('input:first'));
        }

        function indeterminateBox($this) {
            var $parent = $this.parents().eq(2).find('input:first');
            $parent.prop('indeterminate', true);
            if($this.parents().eq(2).hasClass('treeview') || ($this.attr('id') == "suLu")){
                return false;
            }
            indeterminateBox($parent);
        }

        function completeBox($this) {
            var inputVector = $this.parent().parent().find('input');
            if($this.prop('id') == 'suLu'){
                return false;
            }
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

        var $copy = $('#copy').css({"background-color": "orange",
                                    "border": "1px solid black",
                                    "width": "250px"});

        $copy.html($(this).parent().find('ul:first>li').clone().prepend("★"));
        $copy.children().find('ul ,span, mGlass, input').remove();
        $copy.prepend($(this).prev().prev().clone());

    });


});


window.actions_list = []
function add_cmd_to_list(event){
  var cmd = JSON.parse(event.data)
  window.actions_list.push(cmd)
}


function action_single_cmd(cmd){
  if (cmd.method == 'add_element'){
  $("#"+ cmd.parent_id).append(
      ['<',cmd.element_type,' id="',cmd.element_id,'"></',cmd.element_type
      ,'>'
      ].join(''))
  }
  if (cmd.method == 'set_inner_html' ){
    $("#"+cmd.element_id).text(cmd.text)
  }
  if (cmd.method == 'set_css' ){
    $("#"+cmd.element_id).css( cmd.property,cmd.value )
  }
  if (cmd.method == 'alert' ){
    alert(cmd.message)
  }
  if (cmd.method == 'add_onclick' ){
    $("#"+cmd.element_id).click(function(){
      ws.send("click,"+cmd.element_id)
    })
  }
  if (cmd.method == 'add_onkeypress' ){
    $("#"+cmd.element_id).keypress(function(e){
      ws.send("keypress,"+cmd.element_id+","+e.which)
    })
  }
  if (cmd.method == 'get_value' ){
    var val = $("#"+cmd.element_id).val()
    ws.send("value,"+cmd.element_id+","+val)
  }
  if (cmd.method == 'set_value' ){
    var val = $("#"+cmd.element_id).val(cmd.value)
  }
  if (cmd.method == 'remove_element' ){
    var val = $("#"+cmd.element_id).remove()
  }
}


function event_parser(event){
  var i;
  for(i = 0; i < 100; i++){
    var cmd = window.actions_list.shift();
    if (cmd == undefined){ return }
    action_single_cmd(cmd)
  }
}

setInterval('event_parser()',0)

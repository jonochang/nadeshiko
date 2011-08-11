require 'em-websocket'
require 'json'
require 'digest/sha1'


elements = ['element','button','textfield','list','grid']

require_relative 'lib/dsl'
elements.each{|x| require_relative 'lib/elements/'+x }

libs = ['dom_on_sockets','app','activerecord']
libs.each{|x| require_relative 'lib/'+ x}

require_relative 'stores/movie_store'

require_relative 'myapp'

EventMachine.run do
  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |web_socket|
    web_socket.onopen do
      dom_on_sockets = DomOnSockets.new(web_socket)
      app = MyApp.new dom_on_sockets
      app.setup_app
    end
  end
  puts "Server started"
end

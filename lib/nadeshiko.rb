require "rubygems"
require "bundler/setup"


require 'json'
require 'digest/sha1'

require 'em-websocket'

# Defining Nadeshiko const
module Nadeshiko
end

elements = ['element','button','grid','dialog','grid2']
elements.each{|x| require_relative 'nadeshiko/elements/'+x }

libs = [
  'dom_on_sockets',
  'application',
  'generic_observer',
  'server'
  ]

libs.each{|x| require_relative 'nadeshiko/'+ x}

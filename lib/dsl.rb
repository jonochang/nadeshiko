module Dsl

  attr_accessor :children, :element_type

  def method_missing method,*args, &block
    a = Node.new(method)
    a.instance_eval(&block) if block_given?
    @children << a
  end
  
end

class Node
  include Dsl
  def initialize(element_type)
    @element_type = element_type
    @children = []
  end
end


#p = Node.new :root

#p.instance_eval do
#  hbox do
#    vbox do
#      text 'a'
#      text 'b'
#      button 'hello'
#    end
#    button 'hello'
#  end
#end

#puts p.inspect

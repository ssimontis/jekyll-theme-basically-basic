module Jekyll
  class BuzzwordCapsuleTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def hash_color
      @text.length % 5
    end

    def render(context)
      "<button class=\"buzzword-#{hash_color}\" data-buzzword=\"#{@text}\">#{@text}</button>"
    end
  end
end

Liquid::Template.register_tag('buzzword', Jekyll::BuzzwordCapsuleTag)

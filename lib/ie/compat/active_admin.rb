if defined? ActiveAdmin
  module IE; module Compat

  module ActiveAdminBasePage
    def build(*args)
      super
      add_ie_compat_tag
    end

    def add_ie_compat_tag
      within @head do
        text_node(ie_compat_tags)
      end
    end
  end

  end; end

  ActiveAdmin::Views::Pages::Base.class_eval do
    include IE::Compat::ActiveAdminBasePage
  end
end

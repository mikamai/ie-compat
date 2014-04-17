module IE
  module Compat
    class Railtie < ::Rails::Railtie
      config.ie_compat = ActiveSupport::OrderedOptions.new

      initializer 'ie-compat.initialize' do
        require 'ie/compat/assets_path'
        require 'ie/compat/view_helper'
        require 'ie/compat/active_admin'

        ActiveSupport.on_load(:action_view) do
          include ::IE::Compat::ViewHelper
        end

        config.assets.precompile += %w[ie-compat/*.js]
      end
    end
  end
end

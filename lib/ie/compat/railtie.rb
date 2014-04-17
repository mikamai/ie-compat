module IE
  module Compat
    class Railtie < ::Rails::Railtie
      config.ie_compat = ActiveSupport::OrderedOptions.new

      initializer 'ie-compat.initialize' do
        require 'ie/compat'

        ActiveSupport.on_load(:action_view) do
          include ::IE::Compat::ViewHelper
        end

        config.assets.precompile += %w[ie-compat/*.js]
      end
    end
  end
end

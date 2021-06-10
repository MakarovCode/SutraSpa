class ApiController < ActionController::Base
  before_action :dummy_validation

  def dummy_validation
    unless params[:dummy_token] == "abc" && params[:dummy_uuid] == "def"
      render status: 422
      return
    end
  end
end

class Api::V1::InterestsController < ApiController
  before_action :get_user

  def index
    @interests = Interest.all.order(name: :asc)
  end

  def update
    interest = Interest.find params[:id]

    was_selected = @user.mark_interest_as(interest, params[:selected])
    if was_selected
      @user.clear_interest_objects_for(interest)
      @user.save_interest_objects(params[:objects])
    end

    render status: 200, json: {message: "Interests updated"}
  end

  private

  def get_user
    @user = User.find params[:user_id]
  end
end

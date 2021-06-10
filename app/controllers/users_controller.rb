class UsersController < ApplicationController

  def index
    @users = User.all.order(first_name: :asc)
  end

  def show
    @user = User.find params[:id]
  end

end

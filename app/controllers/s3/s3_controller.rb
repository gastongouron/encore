class S3::S3Controller < ApiController

  def create
    user_id = params[:user_id]
    artist_id = params[:artist_id]
    filename = params[:objectName]
    content_type = params[:contentType]
    allowed_extentions = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'ogv']

    bucket = Rails.env.development? ? ENV['S3_BUCKET_DEVELOPMENT'] : ENV['S3_BUCKET_PRODUCTION']

    folder = "user_uploads/#{user_id}/reviews/#{artist_id}"
    target_path = "#{folder}/#{filename}"

    options = {path_style: true}

    headers = {"Content-Type" => params[:contentType], 
               "x-amz-acl" => "public-read"}

    # check filetype
    if is_allowed(content_type, allowed_extentions)

      storage = Fog::Storage.new(
        provider: 'AWS',
        aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
        region: ENV['AWS_REGION']
      )
  
      bucket_url = storage.put_object_url(bucket, target_path, 15.minutes.from_now.to_time.to_i, headers, options)
      public_url = "https://#{bucket}.s3.amazonaws.com/user_uploads/#{user_id}/reviews/#{artist_id}/#{filename}"
      render json: { signedUrl: bucket_url, public: public_url } 

    else

      I18n.locale
      render json: { status: "error", code: 401, message: I18n.t('file.type') }

    end



  end

  # todo: get other files and delete them later on review Save
  # puts get_files(storage, folder, bucket)    
  def get_files(storage, path, bucket)
    storage.directories.get(bucket, prefix: path).files.map do |file|
      puts file.key
    end
  end

  def is_allowed(filetype, extentions)
    extentions.each do |extention|
      return true if filetype.include?(extention)
    end
    return false
  end


end
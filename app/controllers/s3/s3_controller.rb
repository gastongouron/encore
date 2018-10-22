class S3::S3Controller < ApiController

  def create
    puts "HELL YEAH"
    puts current_user
    path = params["path"]
    filename = params["objectName"]
    content = params["contentType"]

    puts '-----------'
    puts content
    puts '-----------'
    puts filename
    # key = "users/#{user_id}/profile_images/#{filename}"

    signer = Aws::S3::Presigner.new
    signed = signer.presigned_url(:put_object,
                     bucket: 'encorencore',
                     key: "/uploads/#{filename}",
                     acl: 'public-read',
                     content_type: content)


    puts signed
    # response.set_header('Access-Control-Allow-Origin', "http://localhost:3000") 
    # response.set_header('Access-Control-Allow-Credentials', "true")
 
    render json: { signedUrl: signed }

  end



end
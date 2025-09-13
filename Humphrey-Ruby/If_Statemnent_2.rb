def max (num1, num2 , num3)
    if num1 >= num2 and num1 >= num3
        return num1
    elsif num2 >= num1 and num2 >- num3
        return num2 
    else
        return num3
    end
end

puts max(1, 3, 5)
puts ""
puts max(3, 5, 1)
puts ""
puts max(5, 1, 3)
puts ""